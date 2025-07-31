using Microsoft.EntityFrameworkCore;
using PatientAppV5.Server.Models;

namespace PatientAppV5.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options) { }

        public DbSet<Patient> Patients { get; set; }
    }
}
