type TextClockProps = {
  time: Date;
  locale?: 'en' | 'ko';
};

const TextClock = ({ time, locale = 'en' }: TextClockProps) => {
  return (
    <div className="flex gap-4 justify-center items-center">
      <div className="flex flex-col">
        <span className="text-2xl font-bold">{time.getHours() % 12}</span>
        <span className="text-gray-500">
          {time.getHours() >= 12 ? (locale === 'en' ? 'PM' : '오후') : locale === 'en' ? 'AM' : '오전'}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold">{time.getMinutes()}</span>
        <span className="text-gray-500">{locale === 'en' ? 'Minutes' : '분'}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold">{time.getSeconds()}</span>
        <span className="text-gray-500">{locale === 'en' ? 'Seconds' : '초'}</span>
      </div>
    </div>
  );
};

export default TextClock;
