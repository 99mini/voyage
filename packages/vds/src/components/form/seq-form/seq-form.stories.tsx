import { Button, Label } from '@/components/atom';

import { Meta } from '@storybook/react/*';

import Input from '../input';
import SeqForm from './seq-form';

const meta = {
  title: 'form/SeqForm',
  component: SeqForm,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof SeqForm>;

export const Default: React.FC<React.ComponentProps<typeof SeqForm>> = ({ ...args }) => {
  return (
    <SeqForm
      InputComponents={[
        <Label>
          First Name
          <Input name="firstName" placeholder="Enter your first name" required />
        </Label>,
        <Label>
          Last Name
          <Input name="lastName" placeholder="Enter your last name" required />
        </Label>,
        <Label>
          Email
          <Input name="email" type="email" placeholder="Enter your email" required />
        </Label>,
      ]}
      onSubmit={(e) => {
        e.preventDefault();
        alert(`Form submitted!: ${JSON.stringify(Object.fromEntries(new FormData(e.currentTarget) as any), null, 2)}`);
      }}
    >
      <Button type="submit">Submit</Button>
    </SeqForm>
  );
};

export default meta;
