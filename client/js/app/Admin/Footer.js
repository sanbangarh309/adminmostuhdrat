import React from 'react';

const Footer = () => (
  <footer className="footer-area">
 <div className="container">
   <div className="row justify-content-center">
     <div className="col-lg-12">
       <div className="footer-top flex-column">
         <div className="footer-logo">
           <h4>Mostuhdrat</h4>
         </div>
         <div className="footer-social">
           <a href="#"><i className="fa fa-facebook"></i></a>
           <a href="#"><i className="fa fa-twitter"></i></a>
           <a href="#"><i className="fa fa-dribbble"></i></a>
           <a href="#"><i className="fa fa-behance"></i></a>
         </div>
       </div>
     </div>
   </div>
   <div className="row footer-bottom justify-content-center">
     <p className="col-lg-8 col-sm-12 footer-text"></p>
Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved
   </div>
 </div>
</footer>
);

export default Footer;
