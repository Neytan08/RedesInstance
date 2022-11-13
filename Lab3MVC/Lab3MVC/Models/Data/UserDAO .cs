using Lab3MVC.Models.Domain;
using System.Data.SqlClient;

namespace Lab3MVC.Models.Data
{
    public class UserDAO
    {
        //private static string confi = @"Server=163.178.173.148;Initial Catalog=IF4101_Project_B95571_B98295_B70274_B97291;User ID=lenguajes;Password=lg.2022zx";
        private readonly IConfiguration _configuration;
        string connectionString;

        public UserDAO(IConfiguration configuration)
        {
           // _configuration = configuration;
           // connectionString = _configuration.GetConnectionString("Server=163.178.173.148;Initial Catalog=IF4101_Project_B95571_B98295_B70274_B97291;User ID=lenguajes;Password=lg.2022zx");

            _configuration = configuration;
            connectionString = _configuration.GetConnectionString("DefaultConnection");
        }

      

        public int Insert(User user)
        { 
            int resultToReturn = 0;//it will save 1 or 0 depending on the result of insertion
            Exception? exception = new Exception();
            try
            {

                using (SqlConnection connection = new SqlConnection(connectionString))
                {


                    connection.Open();
                    SqlCommand command = new SqlCommand("InsertUser", connection);
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                   
                    command.Parameters.AddWithValue("@Name", user.Name);
                    command.Parameters.AddWithValue("@LastName", user.LastName);
                    command.Parameters.AddWithValue("@Telephone", user.Telephone);
                    command.Parameters.AddWithValue("@Address", user.Address);
                    command.Parameters.AddWithValue("@Email", user.Email);
                    command.Parameters.AddWithValue("@Password", user.Password);
                    command.Parameters.AddWithValue("@Id_Role", user.Role.Id);

                    resultToReturn = command.ExecuteNonQuery();
                    connection.Close();

                }
            }
            catch (Exception ex)
            {
                exception = ex;
                throw exception;
            }


            return resultToReturn;

        }

        public List<User> Get()
        {

            List<User> users = new List<User>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {

                connection.Open();
                SqlCommand command = new SqlCommand("GetAllUsers", connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;

                SqlDataReader sqlDataReader = command.ExecuteReader();
                while (sqlDataReader.Read())
                {

                    users.Add(new User
                    {
                        Id = Convert.ToInt32(sqlDataReader["Id"]),
                        Name = sqlDataReader["Name"].ToString(),
                        LastName = sqlDataReader["LastName"].ToString(),
                        Telephone = sqlDataReader["Telephone"].ToString(),
                        Address = sqlDataReader["Address"].ToString(),
                        Email = sqlDataReader["Email"].ToString(),
                        Role = new Role(0, sqlDataReader["Role_Name"].ToString())

                    });

                }

                connection.Close();

                return users;

            }
        }

        public User Get(string email)
        {
            User user = new User();
            Exception? exception = new Exception();
            try
            {

                using (SqlConnection connection = new SqlConnection(connectionString))
                using (SqlCommand command = new SqlCommand("GetUser", connection))
                {


                    connection.Open();
                  
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Email", email);

                    SqlDataReader sqlDataReader = command.ExecuteReader();


                    if (sqlDataReader.Read())
                    {
                        user.Id = Convert.ToInt32(sqlDataReader.GetInt32(0));
                        user.Name = sqlDataReader.GetString(1);
                        user.LastName = sqlDataReader.GetString(2);
                        user.Telephone = sqlDataReader.GetString(3);
                        user.Address = sqlDataReader.GetString(4);
                        user.Email = sqlDataReader.GetString(5);
                        user.Password = sqlDataReader.GetString(6);
                        user.Role = new Role(Convert.ToInt32(sqlDataReader.GetInt32(7)), null);


                    }

                    connection.Close();


                    return user;
                }
            }
            catch (Exception ex)
            {
                exception = ex;
                throw exception;
            }
        }

        public System.Boolean ValidateAdmin(User user, User userLog)
        {
            if (user.Email.Equals(userLog.Email) && user.Password.Equals(userLog.Password))
            {
                return true;
            }
            return false;
        }


        public int Update(User user)
        { 
            int resultToReturn = 0;//it will save 1 or 0 depending on the result of insertion
            Exception? exception = new Exception();
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {


                    connection.Open();
                    SqlCommand command = new SqlCommand("UpdateUser", connection);
                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@Id", user.Id);
                    command.Parameters.AddWithValue("@Name", user.Name);
                    command.Parameters.AddWithValue("@LastName", user.LastName);
                    command.Parameters.AddWithValue("@Telephone", user.Telephone);
                    command.Parameters.AddWithValue("@Address", user.Address);
                    command.Parameters.AddWithValue("@Email", user.Email);
                    command.Parameters.AddWithValue("@Password", user.Password);
                    command.Parameters.AddWithValue("@Id_Role", user.Role.Id);

                    resultToReturn = command.ExecuteNonQuery();
                    connection.Close();

                }
            }
            catch (Exception ex)
            {
                exception = ex;
                throw exception;
            }


            return resultToReturn;

        }



        public int Delete(User user)
        {
           
            int resultToReturn = 0;//it will save 1 or 0 depending on the result of insertion
            Exception? exception = new Exception();
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {


                    connection.Open();
                    SqlCommand command = new SqlCommand("DeleteUser", connection);
                    command.CommandType = System.Data.CommandType.StoredProcedure;                 
                    command.Parameters.AddWithValue("@Id_User", user.Id);

                    resultToReturn = command.ExecuteNonQuery();
                    connection.Close();

                }
            }
            catch (Exception ex)
            {
                exception = ex;
                throw exception;
            }


            return resultToReturn;

        }

        //admin
        public List<User> GetAdmin()
        {

            List<User> users = new List<User>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {

                connection.Open();
                SqlCommand command = new SqlCommand("GetAllAdmin", connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;

                SqlDataReader sqlDataReader = command.ExecuteReader();
                while (sqlDataReader.Read())
                {

                    users.Add(new User
                    {
                        Id = Convert.ToInt32(sqlDataReader["Id"]),
                        Name = sqlDataReader["Name"].ToString(),
                        LastName = sqlDataReader["LastName"].ToString(),
                        Telephone = sqlDataReader["Telephone"].ToString(),
                        Address = sqlDataReader["Address"].ToString(),
                        Email = sqlDataReader["Email"].ToString(),
                        Role = new Role(0, sqlDataReader["Role_Name"].ToString())

                    });

                }

                connection.Close();

                return users;

            }
        }

        public List<User> GetDependent()
        {

            List<User> users = new List<User>();
            using (SqlConnection connection = new SqlConnection(connectionString))
            {

                connection.Open();
                SqlCommand command = new SqlCommand("GetAllDependent", connection);
                command.CommandType = System.Data.CommandType.StoredProcedure;

                SqlDataReader sqlDataReader = command.ExecuteReader();
                while (sqlDataReader.Read())
                {

                    users.Add(new User
                    {
                        Id = Convert.ToInt32(sqlDataReader["Id"]),
                        Name = sqlDataReader["Name"].ToString(),
                        LastName = sqlDataReader["LastName"].ToString(),
                        Telephone = sqlDataReader["Telephone"].ToString(),
                        Address = sqlDataReader["Address"].ToString(),
                        Email = sqlDataReader["Email"].ToString(),
                        Role = new Role(0, sqlDataReader["Role_Name"].ToString())

                    });

                }

                connection.Close();

                return users;

            }
        }
     }
}

