//@route GET /
//@desc sending the response on the landing page of the project
//@access public
exports.home = (req, res) => {
  res.send(
    '<center><h1>WelCome To your TimeAssitant, this will help you to manage your times</h1></center><br><center><h3>This is in under construction</h3></center>'
  );
};
