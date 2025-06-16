import { useForm } from "react-hook-form";

function CreateInput() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data:any) => console.log(data);
  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="name"
        {...register("name", { required: true })}
      />
      <select {...register("type", { required: true })}>
        <option value="text">text</option>
        <option value="select">select</option>
        <option value="number">number</option>
        <option value="password">password</option>
        <option value="email">email</option>
      </select>

      <input type="submit" />
    </form>
  );
}

export default CreateInput;
