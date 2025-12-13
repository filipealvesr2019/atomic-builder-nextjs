import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'cms-next' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(buffer);
    });

    return NextResponse.json({ 
        url: result.secure_url,
        public_id: result.public_id 
    });

  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

export async function DELETE(request) {
    try {
        const { public_id } = await request.json();
        if (!public_id) {
            return NextResponse.json({ error: 'Missing public_id' }, { status: 400 });
        }

        const result = await cloudinary.uploader.destroy(public_id);
        
        return NextResponse.json({ result });
    } catch (error) {
        console.error('Cloudinary Delete Error:', error);
        return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
    }
}
