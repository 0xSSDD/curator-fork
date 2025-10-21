function getImageUrl(src: string | undefined) {
  if (!src || typeof src !== 'string') return src;
  const image = src.split('ipfs://');
  if (image.length === 2) {
    return `https://gateway.lighthouse.storage/ipfs/${image[1]}`;
  }
  return src;
}

type IpfsImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  cid: string;
};

export const IpfsImage = ({ cid, ...props }: IpfsImageProps) => {
  // biome-ignore lint/a11y/useAltText: alt must be provided when using the component
  return <img src={getImageUrl(cid)} {...props} />;
};
