using Lab3MVC.Models.Domain;
using System.Data.SqlClient;

namespace Lab3MVC.Models.Data
{
    public class RoleDAO
    {
        //private static string confi = @"Server=163.178.173.148;Initial Catalog=IF4101_Project_B95571_B98295_B70274_B97291;User ID=lenguajes;Password=lg.2022zx";
        private readonly IConfiguration _configuration;
        string connectionString;

        public RoleDAO(IConfiguration configuration)
        {
            // _configuration = configuration;
            // connectionString = _configuration.GetConnectionString("Server=163.178.173.148;Initial Catalog=IF4101_Project_B95571_B98295_B70274_B97291;User ID=lenguajes;Password=lg.2022zx");

            _configuration = configuration;
            connectionString = _configuration.GetConnectionString("DefaultConnection");
        }


        public int Insert(Role role)
        { 
            int resultToReturn = 0;//it will save 1 or 0 depending on the result of insertion
            Exception? exception = new Exception();
            try
            {

                using (SqlConnection connection = new SqlConnection(connectionString))
                {


                    connection.Open();
                    SqlCommand command = new SqlCommand("InsertRole", connection);
                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@Name", role.Name);
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


        public List<Role> Get() //ya no es void, sino una lista
        {

            List<Role> role = new List<Role>();

            //usaremos using para englobar todo lo que tiene que ver con una misma cosa u objeto. En este caso, todo lo envuelto acá tiene que ver con connection, la cual sacamos con la clase SqlConnection y con el string de conexión que tenemos en nuestro appsetting.json
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open(); //abrimos conexión
                SqlCommand command = new SqlCommand("GetAllRole", connection);//llamamos a un procedimiento almacenado (SP) que crearemos en el punto siguiente. La idea es no tener acá en el código una sentencia INSERT INTO directa, pues es una mala práctica y además insostenible e inmantenible en el tiempo. 
                command.CommandType = System.Data.CommandType.StoredProcedure; //acá decimos que lo que se ejecutará es un SP

                //logica del get/select
                SqlDataReader sqlDataReader = command.ExecuteReader();
                //leemos todas las filas provenientes de BD
                while (sqlDataReader.Read())
                {
                    role.Add(new Role
                    {
                        Id = Convert.ToInt32(sqlDataReader["Id_Role"]),
                        Name = sqlDataReader["Name"].ToString()
                        
                    });

                }

                connection.Close(); //cerramos conexión. 

            return role; //retornamos resultado al Controller.  

        }
    }

        public Role Get(string name)
        {
            Role role = new Role();
            Exception? exception = new Exception();
            try
            {

                using (SqlConnection connection = new SqlConnection(connectionString))
                using (SqlCommand command = new SqlCommand("GetRole", connection))
                {

                    connection.Open();
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Name", name);

                    SqlDataReader sqlDataReader = command.ExecuteReader();



                    if (sqlDataReader.Read())
                    {
                        

                        role.Id = Convert.ToInt32(sqlDataReader.GetInt32(0));
                        role.Name = sqlDataReader.GetString(1);
                        
                    }

                    connection.Close();


                    return role;
                }
            }
            catch (Exception ex)
            {
                exception = ex;
                throw exception;
            }
        }



        public int Update(Role role)
        {
            int resultToReturn = 0;//it will save 1 or 0 depending on the result of insertion
            Exception? exception = new Exception();
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {


                    connection.Open();
                    SqlCommand command = new SqlCommand("UpdateRole", connection);
                    command.CommandType = System.Data.CommandType.StoredProcedure;

                    command.Parameters.AddWithValue("@Id_Role", role.Id);
                    command.Parameters.AddWithValue("@Name_Role", role.Name);

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



        public int Delete(Role role)
        {

            int resultToReturn = 0;//it will save 1 or 0 depending on the result of insertion
            Exception? exception = new Exception();
            try
            {
                using (SqlConnection connection = new SqlConnection(connectionString))
                {


                    connection.Open();
                    SqlCommand command = new SqlCommand("DeleteRole", connection);
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@Id_Role", role.Id);

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

    }
}
