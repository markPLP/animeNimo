import AtoZbuttons from './AtoZbuttons';

const Footer = () => {
  return (
    <div className="bg-base-300 py-[70px]">
      <div className="align-element">
        <p className="mb-6">
          <span className="font-bold">A-Z LIST</span>{' '}
          <span className="px-8">|</span> Searching anime order by alphabet name
          A to Z.
        </p>
        <AtoZbuttons />
      </div>
    </div>
  );
};

export default Footer;
