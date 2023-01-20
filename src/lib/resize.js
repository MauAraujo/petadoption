const ResizeImage = (width, format, name) => {
  const thumborURL = process.env.REACT_APP_THUMBOR_URL;
  const minioURL = process.env.MINIO_URL;
  const bucket = "pet-adoption";
  const path = "/static";

  const src = `${minioURL}/${bucket}${path}/${name}`;

  return `${thumborURL}/unsafe/${width}x/filters:format(${format}/${encodeURIComponent(
    src
  )})`;
};

export default ResizeImage;
