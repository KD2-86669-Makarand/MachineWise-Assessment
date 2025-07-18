const Footer = () => {
  return (
    <>
      <footer className="bg-dark text-white py-4 mt-5 text-center py-3 mt-auto">
        <div>
          <p>
            &copy; {new Date().getFullYear()} MachineWise. All rights reserved.
          </p>
          <p>Contact: support@machinewise.com | Phone: +91-XXXXXXXXXX</p>
        </div>
      </footer>
    </>
  );
};
export default Footer;
