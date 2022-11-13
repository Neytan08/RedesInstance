namespace Lab3MVC.Models.Domain
{
    public class Rate
    {
       private int idRate;
       private Vehicule_Type vehiculeType;
       private float perHour;
       private float perHalfHour;
       private float perDay;
       private float perWeek;
       private float perMonth;
       private float perYear;

        public Rate()
        {
            VehiculeType= new Vehicule_Type();
        }

        public Rate(int idRate, Vehicule_Type vehiculeType, float perHour, float perHalfHour, float perDay, float perWeek, float perMonth, float perYear)
        {
            this.IdRate = idRate;
            this.VehiculeType = vehiculeType;
            this.PerHour = perHour;
            this.PerHalfHour = perHalfHour;
            this.PerDay = perDay;
            this.PerWeek = perWeek;
            this.PerMonth = perMonth;
            this.PerYear = perYear;
        }

        public int IdRate { get => idRate; set => idRate = value; }
        public Vehicule_Type VehiculeType { get => vehiculeType; set => vehiculeType = value; }
        public float PerHour { get => perHour; set => perHour = value; }
        public float PerHalfHour { get => perHalfHour; set => perHalfHour = value; }
        public float PerDay { get => perDay; set => perDay = value; }
        public float PerWeek { get => perWeek; set => perWeek = value; }
        public float PerMonth { get => perMonth; set => perMonth = value; }
        public float PerYear { get => perYear; set => perYear = value; }
    }
}
