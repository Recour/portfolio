import Image from 'next/image';

const ContentfulImage = ({ image, width, height }) => {
  const imageUrl = `https:${image.fields.file.url}`;

  return (
    <Image
      src={imageUrl}
      alt={image.fields.title}
      width={width ?? image.fields.file.details.image.width}
      height={height ?? image.fields.file.details.image.height}
    />
  );
};

export default ContentfulImage;