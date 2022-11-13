namespace Lab3MVC.Models.Domain
{
    public class User
    {
		private int id;
		private string name;
		private string lastName;
		private string telephone;
		private string address;
		private string email;
		private string password;
        private Role role;

        public User()
        {
            Role = new Role();
        }

        public User(int id, string name, string lastName, string telephone, string address, string email, string password, Role role)
        {
            this.Id = id;
            this.Name = name;
            this.LastName = lastName;
            this.Telephone = telephone;
            this.Address = address;
            this.Email = email;
            this.Password = password;
            this.Role = role;
        }

        public int Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public string LastName { get => lastName; set => lastName = value; }
        public string Telephone { get => telephone; set => telephone = value; }
        public string Address { get => address; set => address = value; }
        public string Email { get => email; set => email = value; }
        public string Password { get => password; set => password = value; }
        public Role Role { get => role; set => role = value; }
    }
}
