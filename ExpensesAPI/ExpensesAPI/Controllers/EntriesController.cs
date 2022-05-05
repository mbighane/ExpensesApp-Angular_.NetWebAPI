using ExpensesAPI.Data;
using ExpensesAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ExpensesAPI.Controllers
{
    [System.Web.Http.Cors.EnableCors("*","*","*" )]
    public class EntriesController : ApiController
    {

        [HttpGet]
        public IHttpActionResult GetEntry(int id)
        {
            try
            {
                using (var dbContext = new AppDbContext())
                {
                    var entry=  dbContext.Entries.FirstOrDefault(n => n.Id == id);
                    if (entry == null) return NotFound();
                    return Ok(entry);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        public IHttpActionResult GetEntries()
        {
            try
            {
                using (var context = new AppDbContext())
                {
                    var entries = context.Entries.ToList();
                    return Ok(entries);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IHttpActionResult PostEntry([FromBody]Entry entry)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                using (var dbContext = new AppDbContext())
                {
                    dbContext.Entries.Add(entry);
                    dbContext.SaveChanges();
                    return Ok("Entry was created");
                }
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut]
        public IHttpActionResult UpdateEntry(int id, [FromBody]Entry entry)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if(id!=entry.Id) return BadRequest();
            try
            {
                using (var dbContext = new AppDbContext())
                {
                    var oldEntry = dbContext.Entries.FirstOrDefault(n => n.Id == id);
                    if (oldEntry == null)
                    {
                        return NotFound();
                    }
                    oldEntry.Description = entry.Description;
                    oldEntry.IsExpense = entry.IsExpense;
                    oldEntry.Value = entry.Value;
                    dbContext.SaveChanges();
                    return Ok("Entry was updated");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public IHttpActionResult DeleteEntry(int id)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
          
            try
            {
                using (var dbContext = new AppDbContext())
                {
                    var entry = dbContext.Entries.FirstOrDefault(n => n.Id == id);
                    if (entry == null) return NotFound();
                    dbContext.Entries.Remove(entry);
                    dbContext.SaveChanges();
                    return Ok("Entry is deleted");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
