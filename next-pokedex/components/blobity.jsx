import useBlobity from "blobity/lib/useBlobity";

export const Blobity = ({ }) => {
  const newLocal = "rgb(255, 255, 255)";
  const options = {
    opacity: 0.5,
    color: newLocal,
  };
  const blobity = useBlobity(options);
  return <div></div>;
};
