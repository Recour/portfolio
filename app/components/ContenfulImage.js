import Image from 'next/image';

const ContentfulImage = ({ image, alt }) => {
  const imageUrl = `https:${image.fields.file.url}`;

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={image.fields.file.details.image.width}
      height={image.fields.file.details.image.height}
    />
  );
};

export default ContentfulImage;