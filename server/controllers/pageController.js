//@route GET /
//@desc sending the response on the landing page of the project
//@access public
exports.homePage = (req, res) => {
  res.send(
    '<center><h1>WelCome To your TimeAssitant, this will help you to manage your times</h1></center><br><center><h3>This is in under construction</h3></center>'
  );
};

exports.signupPage = (req, res) => {
  res.send(
    '<center><h1>This is signUp Page</h1></center><br><center><h3>This is in under construction</h3></center>'
  );
};

exports.loginPage = (req, res) => {
  res.send(
    '<center><h1>This is Login Page</h1></center><br><center><h3>This is in under construction</h3></center>'
  );
};
