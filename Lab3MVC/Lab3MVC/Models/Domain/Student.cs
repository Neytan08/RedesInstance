﻿namespace Lab3MVC.Models.Domain
{
    public class Student
    {

        private int id;
        private string name;
        private string email;
        private string password;
        private Parking major;

        public Student()
        {
            major = new Parking();
        }

        public Student(int id, string name, string email, string password, Parking major)
        {
            this.id = id;
            this.name = name;
            this.email = email;
            this.password = password;
            this.major = major;
        }

        public string Name { get => name; set => name = value; }
        public string Email { get => email; set => email = value; }
        public string Password { get => password; set => password = value; }
        public int Id { get => id; set => id = value; }
        public Parking Major { get => major; set => major = value; }

    }
}
