import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {combineLatest} from 'rxjs';
import {startWith, takeWhile} from 'rxjs/operators';
import {IAddress, IContact, ILabeledAddressInput, ILabeledPhoneInput, IRecurringEvent} from '../../models/contact';
import {IOption} from '../../models/option.model';

@Component({
  selector: 'app-form-create-contact',
  templateUrl: './form-create-contact.component.html',
  styleUrls: ['./form-create-contact.component.scss'],
})
export class FormCreateContactComponent implements OnInit, OnDestroy {

  form: FormGroup;
  submitted = false;
  showMessages: any = {};
  errors: string[] = [];
  messages: string[] = [];

    @Input() formData: IContact;
  @Input() heading = 'Create Contact';

  alive = true;
  categoryOptions: IOption[] = [
    {
      id: 1,
      name: 'Category 1',
      selected: true,
    },
    {
      id: 2,
      name: 'Category 2',
      selected: false,
    },
    {
      id: 3,
      name: 'Category 3',
      selected: false,
    },
    {
      id: 4,
      name: 'Category 4',
      selected: false,
    },
  ];
  websiteLabels: IOption[] = [
    {
      id: 1,
      name: 'Label 1',
      selected: true,
    },
    {
      id: 2,
      name: 'Label 2',
      selected: false,
    },
    {
      id: 3,
      name: 'Label 3',
      selected: false,
    },
    {
      id: 4,
      name: 'Label 4',
      selected: false,
    },
  ];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  get addresses() {
      return this.form.get('addresses') as FormArray;
  }
  get recurring_events() {
      return this.form.get('recurring_events') as FormArray;
  }
  get socials() {
      return this.form.get('socials') as FormArray;
  }
  get websites() {
      return this.form.get('websites') as FormArray;
  }
  get emails() {
      return this.form.get('emails') as FormArray;
  }
  get phones() {
      return this.form.get('phones') as FormArray;
  }
  get initials() {
      return this.form.get('initials');
  }
  get first_name() {
      return this.form.get('first_name');
  }
  get last_name() {
      return this.form.get('last_name');
  }
  get state() {
      return this.form.get('state');
  }
  get city() {
      return this.form.get('city');
  }
  get postal_code() {
      return this.form.get('postal_code');
  }
  get street() {
      return this.form.get('street');
  }

  initForm() {
      const addresses = this.formData && this.formData.addresses
          ? this.formData.addresses.map(address => this.createAddress(address))
          : [this.createAddress()];

      const recurringEvents = this.formData && this.formData.recurring_events
          ? this.formData.recurring_events.map(event => this.createRecurringEvent(event))
          : [this.createRecurringEvent()];

      const phones = this.formData && this.formData.phones
          ? this.formData.phones.map(phone => this.createLabeledPhoneInput(phone))
          : [this.createLabeledPhoneInput()];

      const tags = this.formData && this.formData.tags || [];

      this.form = this.formBuilder.group({
        first_name: [this.formData && this.formData.first_name],
        middle_name: [this.formData && this.formData.middle_name],
        last_name: [this.formData && this.formData.last_name],
          image: [this.formData && this.formData.image],
        dob: [this.formData && this.formData.dob],
        initials: [this.formData && this.formData.initials],
        spouse_name: [this.formData && this.formData.spouse_name],
        company_name: [this.formData && this.formData.company_name],
        job_title: [this.formData && this.formData.job_title],
        phones: this.formBuilder.array([...phones]),
        emails: this.formBuilder.array([...this.labeledAddressInputsOrNew(this.formData && this.formData.emails)]),
        websites: this.formBuilder.array([...this.labeledAddressInputsOrNew(this.formData && this.formData.websites)]),
        socials: this.formBuilder.array([...this.labeledAddressInputsOrNew(this.formData && this.formData.socials)]),
        recurring_events: this.formBuilder.array([...recurringEvents]),
        addresses: this.formBuilder.array([...addresses]),
        notes: [this.formData && this.formData.notes],
        tags: [[...tags]],
      });
      this.setInitials();
  }

  createLabeledPhoneInput(data?: ILabeledPhoneInput): FormGroup {
      return this.formBuilder.group({
          id: [data && data.id],
          type: [data && data.type],
          number: [data && data.number],
      });
  }

    labeledPhoneInputsOrNew(inputs: ILabeledPhoneInput[] = []): FormGroup[] {
        return inputs && inputs.length
            ? this.createLabeledPhoneInputs(inputs)
            : [this.createLabeledAddressInput()];
    }

  createLabeledPhoneInputs(inputs: ILabeledPhoneInput[]): FormGroup[] {
      return inputs.map(input => this.createLabeledPhoneInput(input));
  }

  createLabeledAddressInputs(inputs: ILabeledAddressInput[]): FormGroup[] {
      return inputs.map(input => this.createLabeledAddressInput(input));
  }

  labeledAddressInputsOrNew(inputs: ILabeledAddressInput[] = []): FormGroup[] {
      return inputs && inputs.length
          ? this.createLabeledAddressInputs(inputs)
          : [this.createLabeledAddressInput()];
  }
  createLabeledAddressInput(data?: ILabeledAddressInput) {
      return this.formBuilder.group({
          id: [data && data.id],
          type: [data && data.type],
          address: [data && data.address],
      });
  }
  createAddress(data?: IAddress) {
      return this.formBuilder.group({
          id: [data && data.id],
          type: [data && data.type],
          street: [data && data.street],
          unit: [data && data.unit],
          city: [data && data.city],
          state: [data && data.state],
          postal_code: [data && data.postal_code],
          country: [data && data.country],
      });
  }
  createRecurringEvent(data?: IRecurringEvent) {
      return this.formBuilder.group({
          id: [data && data.id],
          type: [data && data.type],
          date: [data && data.date],
          description: [data && data.description],
      });
  }

  onAddressGotten(addressObject: any, formGroup: FormGroup) {
      // console.info('Address ', addressObject);
      if (addressObject) {
          if (addressObject.admin_area_l1) {
              formGroup.get('state').setValue(addressObject.admin_area_l1);
          }
          if (addressObject.locality) {
              formGroup.get('city').setValue(addressObject.locality);
          }
          if (addressObject.country_short) {
              formGroup.get('country').setValue(addressObject.country_short);
          }
          if (addressObject.postal_code) {
              formGroup.get('postal_code').setValue(addressObject.postal_code);
          }
          formGroup.get('street').setValue(
            `${addressObject.street_number ? addressObject.street_number : ''} ${addressObject.route ? addressObject.route : ''}`
          );
      }
  }

  addFormArrayGroup(group: FormGroup, formArray: FormArray) {
      formArray.push(group);
  }

  setInitials() {
      combineLatest(
          this.first_name.valueChanges.pipe(
              startWith((this.formData && this.formData.first_name) || '')
          ),
          this.last_name.valueChanges.pipe(
              startWith((this.formData && this.formData.last_name ) || '')
          ),
          (firstName, lastName) => {
            // tslint:disable-next-line:max-line-length
            return `${firstName && firstName.length ? firstName.charAt(0).toUpperCase() : ''}${lastName && lastName.length ? lastName.charAt(0).toUpperCase() : ''}`;
          }
      ).pipe(
          takeWhile(() => this.alive)
      ).subscribe((initials) => {
          // check to see if there's at least one character of non whitespace
          if (/\S/.test(initials)) {
              this.initials.setValue(initials);
          } else {
              this.initials.setValue('');
          }
      });
  }

  create(formData) {
    console.log(formData);
  }

    ngOnDestroy() {
        this.alive = false;
    }

    removeFormArrayItem(index: number, formArray: FormArray) {
      if ( (index >= 0) && this.hasTwoOrMoreItems(formArray)) {
          formArray.removeAt(index);
      }
    }

    hasTwoOrMoreItems(formArray: FormArray) {
        return formArray && formArray.length > 1;
    }
}
