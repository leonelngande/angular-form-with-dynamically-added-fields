export interface IContact {
    DocId: string;
    first_name: string;
    middle_name?: string;
    last_name?: string;
    image?: string;
    dob?: string;
    initials?: string;
    spouse_name?: string;
    file_as?: string;
    company_name?: string;
    job_title?: string;
    notes?: string;
    phones?: Array<ILabeledPhoneInput>;
    emails?: Array<ILabeledAddressInput>;
    websites?: Array<ILabeledAddressInput>;
    socials?: Array<ILabeledAddressInput>;
    addresses?: Array<IAddress>;
    recurring_events?: Array<IRecurringEvent>;
    add_to_outlook?: boolean;
    tags?: Array<string>;
    buckets?: Array<string>;
    programs?: Array<string | number>;

}

export interface IAddress {
    id: string;
    type: string;
    street: string;
    unit?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
}

export interface IRecurringEvent {
    id: string;
    type: string;
    date: string;
    description?: string;
}

export interface ILabeledInput {
    id: string;
    type: string;
}

export interface ILabeledPhoneInput extends ILabeledInput {
    number: string;
    SMS?: boolean;
}

export interface ILabeledAddressInput extends ILabeledInput {
    address: string;
}
