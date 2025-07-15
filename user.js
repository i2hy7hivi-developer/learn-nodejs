function exportUser(name, role) {
  return {
    name: name,
    role: role
  };
}

module.exports = {
  exportUser: exportUser
};