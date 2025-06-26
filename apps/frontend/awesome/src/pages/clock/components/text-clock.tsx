type TextClockProps = {
  time: Date;
  locale?: 'en' | 'ko';
};

const TextClockContainer = ({ time, text }: { time: number; text: string }) => {
  return (
    <div className="flex-1 min-w-16 w-full flex flex-col">
      <span className="text-2xl font-bold">{time}</span>
      <span className="text-gray-500">{text}</span>
    </div>
  );
};

const TextClock = ({ time, locale = 'en' }: TextClockProps) => {
  return (
    <div className="flex gap-4 justify-center items-center w-full">
      <TextClockContainer
        time={time.getHours() % 12}
        text={time.getHours() >= 12 ? (locale === 'en' ? 'PM' : '오후') : locale === 'en' ? 'AM' : '오전'}
      />
      <TextClockContainer time={time.getMinutes()} text={locale === 'en' ? 'Minutes' : '분'} />
      <TextClockContainer time={time.getSeconds()} text={locale === 'en' ? 'Seconds' : '초'} />
    </div>
  );
};

export default TextClock;
