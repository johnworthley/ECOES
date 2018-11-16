import React, { Component } from 'react';
import { Formik } from 'formik'
import *  as yup from 'yup'
import Form, {
  Input,
  Datepicker,
  Select,
  Checkbox,
  Radio,
  Textarea,
  Button,
  SubmitBtn,
  Toggle,
  DropZone,
} from 'react-formik-ui'

class ExampleForm extends Component {
  onSubmit = data => {
    console.log(data)
  }

  // example of validation with yup
  getSchema = () => {
    return yup.object().shape({
      salutation: yup
        .string(),
      firstName: yup
        .string()
        .required('First name is required'),
      lastName: yup
        .string()
        .required('Last name is required'),
      email: yup
        .string()
        .email('Wrong format')
        .required('Email is required'),
      birthDay: yup
        .date(),
      maritalStatus: yup
        .string()
        .nullable(),
      driverLicense: yup
        .boolean(),
      pets: yup
        .boolean(),
      income: yup
        .string()
        .required('Income is required'),
      files: yup
        .array()
        .required('Image is required'),
      additionalInfo: yup
        .string(),
      termsAndConitions: yup
        .boolean(),
    });
  }

  render() {
    const styledDiv = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '15px'
    }

    return (
      <Formik
        initialValues={{
          salutation: 'Mr',
          firstName: '',
          lastName: '',
          email: '',
          birthDay: '',
          maritalStatus: '',
          driverLicense: false,
          pets: false,
          income: '',
          files: [],
          additionalInfo: '',
          termsAndConitions: false,
        }}
        validationSchema={this.getSchema}
        onSubmit={this.onSubmit}
        render={({ values }) => {
          return (
            <Form styled>
              <fieldset>
                <legend>Form Example:</legend>

                <Radio
                  name='salutation'
                  label='Salutation'
                  options={[
                    { value: 'Mr', label: 'Mr.' },
                    { value: 'Mrs', label: 'Mrs.' },
                    { value: 'Ms', label: 'Ms.' }
                  ]}
                />

                <Input
                  name='firstName'
                  label='First name'
                  required
                />

                <Input
                  name='lastName'
                  label='Last name'
                  required
                />

                <Input
                  name='email'
                  label='Enter your Email'
                  required
                />

                <Datepicker
                  name='birthDay'
                  label='Birthday'
                  dateFormat='D.M.YYYY'
                  placeholder='D.M.YYYY'
                  hint='Please enter your birth date'
                />

                <Select
                  name='maritalStatus'
                  label='Marital Status'
                  placeholder='Select an Option'
                  options={[
                    { value: '1', label: 'Married' },
                    { value: '2', label: 'Single' },
                    { value: '3', label: 'Divorced' },
                    { value: '4', label: 'Widowed' }
                  ]}
                />

                <div style={styledDiv}>
                  <div>
                    {`Do you have a drivers license ? ${values.driverLicense ? 'Yes' : 'No'}`}
                  </div>
                  <Toggle name='driverLicense' />
                </div>

                <div style={styledDiv}>
                  <div>
                    {`Do you own pets ? ${values.pets ? 'Yes' : 'No'}`}
                  </div>
                  <Toggle name='pets' />
                </div>

                <Input
                  name='income'
                  label={`What is your monthly income $${values.income}`}
                  type='range'
                  min='0'
                  max='10000'
                  step='500'
                  required
                />

                <DropZone
                  name='files'
                  label='File upload'
                />

                <Textarea
                  name='additionalInfo'
                  label='Aditional information'
                  hint='this is optional'
                />

                <Checkbox
                  name='termsAndConitions'
                  label='Terms and Conditions'
                  text='Click to accept the terms and conditions'
                />

                <SubmitBtn disabled={!values.termsAndConitions} />
                <Button onClick={(() => alert('Cancel'))}>Cancel</Button>
              </fieldset>
            </Form>
          );
        }}
      />
    );
  }
}

export default ExampleForm;