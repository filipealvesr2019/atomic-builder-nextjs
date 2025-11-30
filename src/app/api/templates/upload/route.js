import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const themeName = formData.get('themeName');
    const files = formData.getAll('files');

    if (!themeName || files.length === 0) {
      return NextResponse.json(
        { error: 'Nome do tema e arquivos são obrigatórios' },
        { status: 400 }
      );
    }

    // Path to src/templates/[themeName]
    const templatesDir = path.join(process.cwd(), 'src', 'templates');
    const themeDir = path.join(templatesDir, themeName);

    // Create templates directory if it doesn't exist
    await fs.mkdir(templatesDir, { recursive: true });
    await fs.mkdir(themeDir, { recursive: true });

    // Ignored paths
    const ignoredPaths = [
      'node_modules', '.next', 'build', 'dist', '.git', '.github',
      '.vscode', '.idea', 'coverage', '.cache', 'out', '.vercel',
      '.turbo', 'public', '.env', '.env.local', '.DS_Store',
      'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'
    ];

    let copiedCount = 0;

    for (const file of files) {
      const fileName = file.name; // This is the webkitRelativePath
      const fileLower = fileName.toLowerCase();

      // Check if path contains ignored folders
      let shouldIgnore = false;
      for (const ignored of ignoredPaths) {
        if (fileLower.includes(`/${ignored}/`) ||
            fileLower.includes(`\\${ignored}\\`) ||
            fileLower.startsWith(`${ignored}/`) ||
            fileLower.startsWith(`${ignored}\\`) ||
            fileLower === ignored) {
          shouldIgnore = true;
          break;
        }
      }

      if (shouldIgnore) continue;

      // Remove the first path segment (theme folder name)
      const pathParts = fileName.split('/');
      pathParts.shift(); // Remove theme name
      const relativePath = pathParts.join('/');

      if (!relativePath) continue;

      // Full path to save
      const fullPath = path.join(themeDir, relativePath);
      const dir = path.dirname(fullPath);

      // Create directory
      await fs.mkdir(dir, { recursive: true });

      // Write file
      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(fullPath, buffer);

      copiedCount++;
    }

    // Auto-register template in registry.js
    const registryPath = path.join(templatesDir, 'registry.js');
    
    try {
      // Find the main page file (could be pages/index.js or src/app/page.js)
      let mainPagePath = null;
      const possiblePaths = [
        path.join(themeDir, 'pages', 'index.js'),
        path.join(themeDir, 'pages', 'index.jsx'),
        path.join(themeDir, 'src', 'app', 'page.js'),
        path.join(themeDir, 'src', 'app', 'page.jsx'),
        path.join(themeDir, 'app', 'page.js'),
        path.join(themeDir, 'app', 'page.jsx'),
      ];
      
      for (const possiblePath of possiblePaths) {
        try {
          await fs.access(possiblePath);
          // File exists, determine relative path from theme dir
          const relativePath = possiblePath.replace(themeDir + path.sep, '').replace(/\\/g, '/');
          mainPagePath = relativePath.replace(/\.(jsx?|tsx?)$/, ''); // Remove extension
          break;
        } catch {
          // File doesn't exist, try next
        }
      }
      
      if (!mainPagePath) {
        console.error(`[UPLOAD] Could not find main page file for theme: ${themeName}`);
        return NextResponse.json({
          success: true,
          themeName,
          filesCount: copiedCount,
          path: themeDir,
          registered: false,
          error: 'Main page file not found'
        });
      }
      
      let registryContent = await fs.readFile(registryPath, 'utf-8');
      
      // Check if template is already registered
      const isRegistered = registryContent.includes(`registerTemplate('${themeName}'`);
      
      if (!isRegistered) {
        // Find the import section and add new import
        const importStatement = `import ${themeName.replace(/-/g, '_')} from './${themeName}/${mainPagePath}';\n`;
        
        // Find where to insert the import (after existing imports)
        const importInsertIndex = registryContent.lastIndexOf('import');
        let insertPosition;
        
        if (importInsertIndex === -1) {
          // No imports yet, add after registry declaration
          insertPosition = registryContent.indexOf('const templates = {};') + 'const templates = {};'.length;
          registryContent = registryContent.slice(0, insertPosition) + 
                          `\n\n// Auto-imported templates\n${importStatement}` + 
                          registryContent.slice(insertPosition);
        } else {
          // Add after last import
          const nextNewline = registryContent.indexOf('\n', importInsertIndex);
          registryContent = registryContent.slice(0, nextNewline + 1) + 
                          importStatement + 
                          registryContent.slice(nextNewline + 1);
        }
        
        // Add registration call
        const registerStatement = `\n// Register ${themeName}\nregisterTemplate('${themeName}', ${themeName.replace(/-/g, '_')});\n`;
        
        // Insert before export default
        const exportIndex = registryContent.indexOf('export default');
        if (exportIndex !== -1) {
          registryContent = registryContent.slice(0, exportIndex) + 
                          registerStatement + 
                          registryContent.slice(exportIndex);
        } else {
          // Just append at the end
          registryContent += registerStatement;
        }
        
        // Write back
        await fs.writeFile(registryPath, registryContent, 'utf-8');
        console.log(`[UPLOAD] Auto-registered template: ${themeName} with path: ${mainPagePath}`);
      }
    } catch (error) {
      console.error('[UPLOAD] Failed to auto-register template:', error);
      // Don't fail the upload if registration fails
    }

    return NextResponse.json({
      success: true,
      themeName,
      filesCount: copiedCount,
      path: themeDir,
      registered: true
    });

  } catch (error) {
    console.error('Error uploading theme:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
