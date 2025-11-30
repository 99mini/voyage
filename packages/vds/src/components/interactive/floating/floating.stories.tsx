import { Meta, StoryObj } from '@storybook/react/*';

import { InteractiveFloating } from './floating';
import { InteractiveFloatingProvieder } from './providers/interactive-provider';

const meta = {
  title: 'interactive/Floating',
  component: InteractiveFloating,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof InteractiveFloating>;

export default meta;

type Story = StoryObj<typeof InteractiveFloating>;

const DummyContent = () => {
  return Array.from({ length: 20 }).map((_, index) => (
    <p key={index} className="mb-4">
      스크롤 컨텐츠 #{index + 1}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua.
    </p>
  ));
};

export const Default: Story = {
  render: () => (
    <InteractiveFloatingProvieder>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">InteractiveFloating Demo</h1>
          <p className="text-gray-600">
            아래로 스크롤하면 버튼이 화면에서 사라지고, 화면 하단에 fixed 포지션으로 CTA 버튼이 나타납니다.
          </p>
        </div>

        <div className="mt-8">
          <p className="text-gray-500">스크롤을 계속 내려보세요...</p>
        </div>

        {DummyContent()}

        <InteractiveFloating
          className="inline-block p-4 bg-blue-500 text-white rounded-lg"
          fixedClassName="p-4 bg-blue-600 text-white shadow-lg"
        >
          <button className="px-6 py-3 font-semibold">버튼을 클릭하세요</button>
        </InteractiveFloating>
      </div>
    </InteractiveFloatingProvieder>
  ),
};

export const TopFixed: Story = {
  render: () => (
    <InteractiveFloatingProvieder>
      <div className="h-[200vh] p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-4">Top Fixed Position</h1>
          <p className="text-gray-600">아래로 스크롤하면 버튼이 화면 상단에 fixed 포지션으로 나타납니다.</p>
        </div>

        <div className="mt-8">
          <p className="text-gray-500">스크롤을 계속 내려보세요...</p>
        </div>

        {DummyContent()}

        <InteractiveFloating
          className="inline-block p-4 bg-blue-500 text-white rounded-lg"
          fixedClassName="p-4 bg-blue-600 text-white shadow-lg"
          fixedPosition="top"
        >
          <button className="px-6 py-3 font-semibold">상단 고정 버튼</button>
        </InteractiveFloating>
      </div>
    </InteractiveFloatingProvieder>
  ),
};

export const CTAButton: Story = {
  render: () => (
    <InteractiveFloatingProvieder>
      <div className="h-[300vh] p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">상품 상세 페이지</h1>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">상품 정보</h2>
            <p className="text-gray-600 mb-4">
              이것은 상품 상세 페이지의 예시입니다. 아래로 스크롤하면 구매 버튼이 화면에서 사라지고, 화면 하단에 고정된
              CTA 버튼으로 나타납니다.
            </p>
          </div>

          {DummyContent()}

          <InteractiveFloating className="mb-8" fixedClassName="bg-white border-t border-gray-200 p-4 shadow-xl">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">가격</p>
                <p className="text-2xl font-bold text-blue-600">₩99,000</p>
              </div>
              <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                구매하기
              </button>
            </div>
          </InteractiveFloating>

          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2">상세 설명 1</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2">상세 설명 2</h3>
              <p className="text-gray-600">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2">상세 설명 3</h3>
              <p className="text-gray-600">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </InteractiveFloatingProvieder>
  ),
};
