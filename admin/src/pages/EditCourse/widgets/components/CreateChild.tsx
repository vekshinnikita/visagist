import { FC } from "react";

interface CreateChildProps {
  create: () => void;
}

const CreateChild: FC<CreateChildProps> = ({ create }) => {
  return (
    <div className="create-child" onClick={create}>
      +
    </div>
  );
};

export default CreateChild;
