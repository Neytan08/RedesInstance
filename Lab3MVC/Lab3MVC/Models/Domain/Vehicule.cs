namespace Lab3MVC.Models.Domain
{
    public class Vehicule
    {

        private int id;
        private string license_Plate;
        private string color;
        private string brand;
        private User user;
        private Vehicule_Type vehicule_type;


        public Vehicule()
        {
            User= new User();
            Vehicule_type = new Vehicule_Type();
        }

        public Vehicule(int id, string license_Plate, string color, string brand, User user, Vehicule_Type vehicule_type)
        {
            this.Id = id;
            this.License_Plate = license_Plate;
            this.Color = color;
            this.Brand = brand;
            this.User = user;
            this.Vehicule_type = vehicule_type;
        }

        public int Id { get => id; set => id = value; }
        public string License_Plate { get => license_Plate; set => license_Plate = value; }
        public string Color { get => color; set => color = value; }
        public string Brand { get => brand; set => brand = value; }
        public User User { get => user; set => user = value; }
        public Vehicule_Type Vehicule_type { get => vehicule_type; set => vehicule_type = value; }
    }
}
