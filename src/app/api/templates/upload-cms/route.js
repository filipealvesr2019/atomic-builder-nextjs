import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const templateId = formData.get('templateId');
    const templateConfigStr = formData.get('templateConfig');
    const files = formData.getAll('files');

    if (!templateId || !files || files.length === 0) {
      return NextResponse.json(
        { error: 'Template ID e arquivos são obrigatórios' },
        { status: 400 }
      );
    }

    const templateConfig = JSON.parse(templateConfigStr);

    // Path to src/templates-cms/[templateId]
    const templatesDir = path.join(process.cwd(), 'src', 'templates-cms');
    const templateDir = path.join(templatesDir, templateId);

    // Create directory
    await fs.mkdir(templatesDir, { recursive: true });
    await fs.mkdir(templateDir, { recursive: true });

    let copiedCount = 0;

    for (const file of files) {
      const fileName = file.name; // webkitRelativePath
      
      // Remove first path segment (template folder name)
      const pathParts = fileName.split('/');
      pathParts.shift();
      const relativePath = pathParts.join('/');

      if (!relativePath) continue;

      // Full path to save
      const fullPath = path.join(templateDir, relativePath);
      const dir = path.dirname(fullPath);

      // Create directory
      await fs.mkdir(dir, { recursive: true });

      // Write file
      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(fullPath, buffer);

      copiedCount++;
    }

    // Update registry.js
    const registryPath = path.join(templatesDir, 'registry.js');
    
    try {
      let registryContent = await fs.readFile(registryPath, 'utf-8');
      
      // Check if already registered
      if (!registryContent.includes(`'${templateId}'`)) {
        // Find main layout
        const mainLayoutPath = templateConfig.layouts?.[0]?.file || 'layouts/HomePage.jsx';
        const layoutName = path.basename(mainLayoutPath, path.extname(mainLayoutPath));
        
        // Add import
        const importStatement = `import ${templateId.replace(/-/g, '_')}_home from './${templateId}/${mainLayoutPath.replace(/\\.jsx?$/, '')}';\n`;
        
        // Add after existing imports
        const lastImportIndex = registryContent.lastIndexOf('import');
        if (lastImportIndex !== -1) {
          const nextNewline = registryContent.indexOf('\n', lastImportIndex);
          registryContent = registryContent.slice(0, nextNewline + 1) + 
                          importStatement + 
                          registryContent.slice(nextNewline + 1);
        }
        
        // Add to templates object
        const templatesObjMatch = registryContent.match(/const templates = \{([^}]*)\}/s);
        if (templatesObjMatch) {
          const newEntry = `\n  '${templateId}': {\n    name: '${templateConfig.name}',\n    layouts: {\n      home: ${templateId.replace(/-/g, '_')}_home\n    }\n  },`;
          registryContent = registryContent.replace(
            /const templates = \{/,
            `const templates = {${newEntry}`
          );
        }
        
        await fs.writeFile(registryPath, registryContent, 'utf-8');
        console.log(`[UPLOAD-CMS] Registered template: ${templateId}`);
      }
    } catch (error) {
      console.error('[UPLOAD-CMS] Failed to update registry:', error);
      // Don't fail upload if registry update fails
    }

    return NextResponse.json({
      success: true,
      templateId,
      name: templateConfig.name,
      filesCount: copiedCount
    });

  } catch (error) {
    console.error('Error uploading CMS template:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
