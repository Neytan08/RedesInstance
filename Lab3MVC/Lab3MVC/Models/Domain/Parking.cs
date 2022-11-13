namespace Lab3MVC.Models.Domain
{
    public class Parking
    {
        private int id;
        private string name;
        private int capacity;
        private string province;
        private string district;

        public Parking()
        {
        }

        public Parking(int id, string name,int capacity, string province,string district)
        {
           this.Id = id;
            this.Name = name;
            this.Capacity = capacity;
            this.Province = province;
            this.District = district;

        }

        public int Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public int Capacity { get => capacity; set => capacity = value; }
        public string Province { get => province; set => province = value; }
        public string District { get => district; set => district = value; }
    }
}
