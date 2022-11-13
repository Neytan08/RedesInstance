namespace Lab3MVC.Models.Domain
{
    public class Vehicule_Type
    {

        private int id;
        private string name;

        public Vehicule_Type()
        {

        }


        public Vehicule_Type(int id, string name)
        {
            this.id = id;
            this.name = name;
        }

        public int Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
    }
}
