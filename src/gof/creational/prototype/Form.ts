import { Field } from "./Field";
import Prototype from "./Prototype";

export class Form implements Prototype {
  fields: Field[] = [];

  constructor(
    public formId: string,
    public category: string,
    public description: string,
  ) {}

  addField(type: string, title: string) {
    this.fields.push(Field.create(type, title));
  }

  clone(): Form {
    const newForm = new Form(this.formId, this.category, this.description);
    const newFields: Field[] = [];
    for (const field of this.fields) {
      newFields.push(field.clone());
    }
    newForm.fields = newFields;
    return newForm;
  }
}
