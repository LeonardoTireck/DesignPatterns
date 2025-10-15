import { Form } from "./Form";

export interface FormRepository {
  getById(formId: string): Promise<Form>;
  save(form: Form): Promise<void>;
}

export class FormRepositoryMemory implements FormRepository {
  forms: Form[] = [];

  async getById(formId: string): Promise<Form> {
    const form = this.forms.find((f) => f.formId === formId);
    if (!form) throw new Error("Form not found");
    return form;
  }
  async save(form: Form): Promise<void> {
    this.forms.push(form);
  }
}
