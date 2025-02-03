function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 text-center py-4 mt-8">
      <p>
        {`Developed by `}
        <a href="https://github.com/99mini" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
          {`99mini`}
        </a>
      </p>
      <p>{`© ${new Date().getFullYear()} 99mini.`}</p>
    </footer>
  );
}

export default Footer;
