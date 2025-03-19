type TextClockProps = {
  time: Date;
  locale?: 'en' | 'ko';
};

const TextClock = ({ time, locale = 'en' }: TextClockProps) => {
  return (
    <div className="flex gap-4 justify-center items-center">
      <div className="min-w-10 flex-1 flex flex-col">
        <span className="text-2xl font-bold">{time.getHours() % 12}</span>
        <span className="w-max text-gray-500">
          {time.getHours() >= 12 ? (locale === 'en' ? 'PM' : '오후') : locale === 'en' ? 'AM' : '오전'}
        </span>
      </div>
      <div className="min-w-10 flex-1 flex flex-col">
        <span className="text-2xl font-bold">{time.getMinutes()}</span>
        <span className="w-max text-gray-500">{locale === 'en' ? 'Minutes' : '분'}</span>
      </div>
      <div className="min-w-10 flex-1 flex flex-col">
        <span className="text-2xl font-bold">{time.getSeconds()}</span>
        <span className="w-max text-gray-500">{locale === 'en' ? 'Seconds' : '초'}</span>
      </div>
    </div>
  );
};

export default TextClock;
