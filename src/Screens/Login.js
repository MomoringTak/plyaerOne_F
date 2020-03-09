import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Helmet from "react-helmet";

const LinkToSingUp = () => {};

const onSubmit = e => {
  if (e) {
    e.preventDefault();
  }
};

const Login = () => {
  return (
    <Box>
      <Helmet>
        <title>LOGIN | WTB</title>
      </Helmet>
      <Form onSubmit={onSubmit}>
        <LoginInput type="email" placeholder="Enter Your Email" />
        <LoginInput type="text" placeholder="Enter Your Password" />
        <ButtonSection>
          <Button type="submit">Log In</Button>
          <SLink to={`/singup`}>
            <Button color="danger">Sing Up</Button>
          </SLink>
        </ButtonSection>
      </Form>
    </Box>
  );
};

export default Login;

const Box = styled.div`
  width: 100%;
  height: 60vh;
  min-height: 540px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  width: 500px;
  height: 500px;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
`;

const LoginInput = styled.input`
  all: unset;

  width: 80%;

  margin-bottom: 30px;
  text-align: center;

  border-bottom: 1px rgba(0, 0, 0, 0.3) solid;
`;

const ButtonSection = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const Button = styled.button`
  all: unset;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
`;

const SLink = styled(Link)``;

/*
import React, { PureComponent } from 'react';

import { storiesOf } from '@storybook/react';

import { Field, Control, Label, Input, Textarea, Select, Checkbox, Radio, Help, InputFile } from 'react-bulma-components/lib/components/form';
import Button from 'react-bulma-components/lib/components/button';
import Icon from 'react-bulma-components/lib/components/icon';


const HoC = (Component) => {
  class Controlled extends React.Component {
    static displayName = 'Select'

    state = {
      value: '',
    }

    onChange = (evt) => {
      this.setState({
        value: evt.target.value,
      });
    }

    render() {
      return <Component onChange={this.onChange} value={this.state.value} {...this.props} />;
    }
  }
  return Controlled;
};

const HoCCheckbox = (Component) => {
  class Controlled extends React.Component {
    static displayName = 'Checkbox'
    state = {
      checked: false,
    }

    onChange = (evt) => {
      this.setState({
        checked: evt.target.checked,
      });
    }

    render() {
      return <Component onChange={this.onChange} checked={this.state.checked} {...this.props} />;
    }
  }
  return Controlled;
};

class RadioGroup extends React.Component {
  state = {
    selected: undefined,
  }

  onChange = (evt) => {
    this.setState({
      selected: evt.target.value,
    });
  }

  render() {
    return (
      <Control>
        <Radio onChange={this.onChange} checked={this.state.selected === 'Yes'} value="Yes" name="question">
          Yes
        </Radio>
        <Radio onChange={this.onChange} checked={this.state.selected === 'No'} value="No" name="question" >
          No
        </Radio>
      </Control>
    );
  }
}

const SelectControlled = HoC(Select);
const CheckboxControlled = HoCCheckbox(Checkbox);

storiesOf('Form', module)
  .addDecorator(story => (
    <div style={{ margin: 50 }}>{story()}</div>
  ))
  .add('Default', (() => (
    <div>
      <Field>
        <Label>Name</Label>
        <Control>
          <Input placeholder="Text input" />
        </Control>
      </Field>

      <Field>
        <Label>Username</Label>
        <Control>
          <Input color="success" type="text" placeholder="Text input" value="bulma" />
        </Control>
        <Help color="success">This username is available</Help>
      </Field>

      <Field>
        <Label>Email</Label>
        <Control>
          <Input color="danger" type="email" placeholder="Email input" value="hello@" />
        </Control>
        <Help color="danger">This email is invalid</Help>
      </Field>
      <Field>
        <Label>With Icons</Label>
        <Control iconLeft iconRight>
          <Input color="success" type="email" placeholder="I have icons" />
          <Icon align="left" icon="bars" />
          <Icon align="right" icon="bars" />
        </Control>
        <Help color="danger">This email is invalid</Help>
      </Field>
      <Field>
        <Label>Subject</Label>
        <Control>
          <SelectControlled>
            <option>Select dropdown</option>
            <option>With options</option>
          </SelectControlled>
        </Control>
      </Field>

      <Field>
        <Label>Message</Label>
        <Control>
          <Textarea placeholder="Textarea" />
        </Control>
      </Field>

      <Field>
        <Label>File</Label>
        <Control>
          <InputFile icon={<Icon icon="upload" />} boxed placeholder="Textarea" />
        </Control>
      </Field>

      <Field>
        <Control>
          <CheckboxControlled>
            I agree to the <a href="#agree">terms and conditions</a>
          </CheckboxControlled>
        </Control>
      </Field>

      <Field>
        <RadioGroup />
      </Field>

      <Field kind="group">
        <Control>
          <Button type="primary">Submit</Button>
        </Control>
        <Control>
          <Button color="link">Cancel</Button>
        </Control>
      </Field>
    </div>
  )))
  .add('Handle Multiple inputs', (() => {
    
    class MultiInputHandler extends PureComponent {
      state = {
        email: '',
        name: '',
        password: '',
        comment: '',
        gender: '',
        question: undefined,
        termsAccepted: false,
      }

      onChange = (evt) => {
        const value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value;
        this.setState({
          [evt.target.name]: value,
        });
      }

      render() {
        const { email, name, password, comment, gender, question, termsAccepted } = this.state;
        return (
          <div>
            <Field>
              <Label>Email</Label>
              <Control>
                <Input onChange={this.onChange} name="email" type="email" placeholder="Email input" value={email} />
              </Control>
            </Field>
            <Field>
              <Label>Name</Label>
              <Control>
                <Input onChange={this.onChange} name="name" type="text" placeholder="Name input" value={name} />
              </Control>
            </Field>
            <Field>
              <Label>Password</Label>
              <Control>
                <Input onChange={this.onChange} name="password" type="password" placeholder="Password" value={password} />
              </Control>
            </Field>
            <Field>
              <Label>Gender</Label>
              <Control>
                <Select onChange={this.onChange} name="gender" value={gender}>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other?</option>
                </Select>
              </Control>
            </Field>
            <Field>
              <Label>Message</Label>
              <Control>
                <Textarea name="comment" value={comment} onChange={this.onChange} placeholder="Textarea" />
              </Control>
            </Field>
            <Field>
              <Label>Do you undertood how to use me?</Label>
              <Control>
                <Radio onChange={this.onChange} checked={question === 'Yes'} value="Yes" name="question">
                  Yes
                </Radio>
                <Radio onChange={this.onChange} checked={question === 'No'} value="No" name="question" >
                  No
                </Radio>
              </Control>
            </Field>
            <Field>
              <Control>
                <Checkbox name="termsAccepted" onChange={this.onChange} checked={termsAccepted}>
                  I agree to the <a href="#agree">terms and conditions</a>
                </Checkbox>
              </Control>
            </Field>
            <pre>
              <code>
                {JSON.stringify(this.state, null, 2)}
              </code>
            </pre>
          </div>
        );
      }
    }
    return <MultiInputHandler />;
  }));

*/
