import { ChangeEvent, FC } from "react";

interface ImageFieldProps {
  value: string;
  resetValue?: any;
  setValue: (callback: any) => void;
}

const ImageField: FC<ImageFieldProps> = ({
  value,
  setValue,
  resetValue = "",
}) => {
  const loadImage = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (e.target.files) {
      if (e.target.files.length > 0) {
        const image = e.target.files[0];
        const render = new FileReader();

        render.onload = (e) => {
          setValue(e.target?.result);
        };

        render.readAsDataURL(image);
      }
    }
  };

  return (
    <div className="image-field">
      <input type="file" onChange={loadImage} />
      <span
        className="loaded-image"
        style={{
          backgroundImage: `url(${value})`,
          zIndex: value ? 1 : "unset",
        }}
      ></span>
      <span
        className="delete-image"
        style={{ display: value ? "flex" : "none" }}
        onClick={() => setValue(resetValue)}
      >
        +
      </span>
      <label>Выберите изображение</label>
    </div>
  );
};

export default ImageField;
