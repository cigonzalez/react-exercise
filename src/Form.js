import formData from "./formData.json";
import useSignupForm from "./customHooks";
import * as Joi from "joi";

function Form() {
  const { fields, page_label } = formData[0];
  const field_validations = {};
  fields.forEach(function (field) {
    field_validations[field.field_id] = Joi.string().required();
    if (field.field_data_type === "string" && field.field_required === false) {
      field_validations[field.field_id] = Joi.string();
    } else if (
      field.field_data_type === "number" &&
      field.field_required === true
    ) {
      field_validations[field.field_id] = Joi.number().required();
    } else if (
      field.field_data_type === "number" &&
      field.field_required === false
    ) {
      field_validations[field.field_id] = Joi.number();
    }
  });
  const schema = Joi.object(field_validations);

  const { handleSubmit, handleInputChange, errors } = useSignupForm(schema);
  return (
    <div>
      <h3>{page_label}</h3>
      <form onSubmit={handleSubmit}>
        {fields.map((field, i) => (
          <div key={field.field_id}>
            <label htmlFor={field.field_id} className="form-label">
              {field.field_label}
            </label>
            <input
              type={field.field_type}
              className="form-control"
              placeholder={field.field_placeholder}
              id={field.field_id}
              name={field.field_id}
              onChange={handleInputChange}
            />
          </div>
        ))}
        <div>
          <p>{errors.toString()}</p>
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Form;
