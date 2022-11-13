namespace Lab3MVC.Models.Domain
{
    public class Space
    {
        private int id;
        private int number;
        private Vehicule_Type type;
        private string status;
        private Vehicule vehicule;
        private Parking parking;
        private string check_in;
        private Rate rate;

        public Space()
        {
            vehicule = new Vehicule(); 
            parking = new Parking();
            type = new Vehicule_Type();
            rate = new Rate();

        }

        public Space(int id, int number, Vehicule_Type type, string status, Vehicule vehicule, Parking parking, string check_in, Rate rate)
        {
            this.id = id;
            this.number = number;
            this.type = type;
            this.status = status;
            this.vehicule = vehicule;
            this.parking = parking;
            this.check_in = check_in;
            this.rate = rate;
        }
        public int Id { get => id; set => id = value; }
        public int Number { get => number; set => number = value; }
        public Vehicule_Type Type { get => type; set => type = value; }
        public string Status { get => status; set => status = value; }
        public string Check_In { get => check_in; set => check_in = value; }
        public Rate Rate { get => rate; set => rate = value; }

        public Vehicule Vehicule { get => vehicule; set => vehicule = value; }

        public Parking Parking { get => parking; set => parking = value; }


    }
}
