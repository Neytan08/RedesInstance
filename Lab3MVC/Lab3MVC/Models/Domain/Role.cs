namespace Lab3MVC.Models.Domain
{
    public class Role
    {
        private int id;
        private string name;

        public Role()
        {
        }

        public Role(int id, string name)
        {
            this.id = id;
            this.Name = name;
        }

        public int Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
    }
}
