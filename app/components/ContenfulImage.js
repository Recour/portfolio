import Image from 'next/image';

const ContentfulImage = ({ image, alt, width, height }) => {
  const imageUrl = `https:${image.fields.file.url}`;

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width ?? image.fields.file.details.image.width}
      height={height ?? image.fields.file.details.image.height}
    />
  );
};

export default ContentfulImage;