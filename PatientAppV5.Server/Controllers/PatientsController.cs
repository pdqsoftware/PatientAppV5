using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PatientAppV5.Server.Data;
using PatientAppV5.Server.Models;
using System.Linq;
using System.Threading.Tasks;


namespace PatientAppV5.Server.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]

    public class PatientsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public PatientsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var patients = await _context.Patients.ToListAsync();
            return Ok(patients);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var patient = await _context.Patients.FindAsync(id);
            if (patient == null) return NotFound();
            return Ok(patient);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Patient patient)
        {
            Console.WriteLine($"Saving patient: {patient.Name} {patient.Surname}");

            _context.Patients.Add(patient);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = patient.Id }, patient);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Patient patient)
        {
            if (id != patient.Id) return BadRequest();
            _context.Entry(patient).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpGet("search")]
        public async Task<IActionResult> Search(string surname, string idNumber)
        {
            var results = await _context.Patients
                .Where(p => (!string.IsNullOrEmpty(surname) && p.Surname.Contains(surname)) ||
                            (!string.IsNullOrEmpty(idNumber) && p.SouthAfricanIdNumber.Contains(idNumber)))
                .ToListAsync();
            return Ok(results);
        }

        // DELETE: api/patients/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var patient = await _context.Patients.FindAsync(id);
            if (patient == null)
            {
                return NotFound();
            }

            _context.Patients.Remove(patient);
            await _context.SaveChangesAsync();

            return NoContent();
        }

    }
}
