import { useRef } from 'react';

import type { Meta } from '@storybook/react';

import SeqForm from '../../seq-form';
import OtpInput, { type OtpInputRef } from './otp';

const meta = {
  title: 'form/input/OtpInput',
  component: OtpInput,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof OtpInput>;

export const Default = ({ ...args }) => <OtpInput {...args} onChange={(value) => console.log(value)} />;

export const WithSeqForm = ({ ...args }) => {
  const ref = useRef<OtpInputRef>(null);

  return (
    <SeqForm
      onSubmit={(e) => alert(`Form submitted!: ${ref.current?.getValue()}`)}
      inputs={[
        {
          name: 'otp',
          render: () => (
            <OtpInput
              validator={() => /^[0-9]{6}$/.test(ref.current?.getValue() || '')}
              ref={ref}
              length={6}
              {...args}
            />
          ),
        },
      ]}
    >
      <button type="submit" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        Submit OTP
      </button>
    </SeqForm>
  );
};

export default meta;
