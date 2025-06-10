package com.ditprogramming.restapi.controller;

import com.ditprogramming.restapi.entity.Contact;
import com.ditprogramming.restapi.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ContactController {

    @Autowired
    ContactRepository contactRepository;
    // get all Contacts
    //localhost:8080/contacts
    @GetMapping("/contacts")
    public List<Contact> getAllContacts() {
        List<Contact> contacts = contactRepository.findAll();
        return contacts;
    }

    @GetMapping("contacts/{id}")
    public Contact getContactById(@PathVariable int id) {
        return contactRepository.findById(id).get();
    }

    @PostMapping("contacts/add")
    @ResponseStatus(code = HttpStatus.CREATED)
   public void createContact(@RequestBody Contact contact) {
        contactRepository.save(contact);
    }

    @PutMapping("contacts/update/{id}")
    public Contact updateContact(@PathVariable int id, @RequestBody Contact contactDetails) {
        return contactRepository.findById(id)
                .map(contact -> {
                    contact.setFirstName(contactDetails.getFirstName());
                    contact.setLastName(contactDetails.getLastName());
                    contact.setCompany(contactDetails.getCompany());
                    contact.setEmail(contactDetails.getEmail());
                    contact.setPhone(contactDetails.getPhone());
                    contact.setAddress(contactDetails.getAddress());
                    return contactRepository.save(contact);
                })
                .orElseThrow(() -> new RuntimeException("Contact not found with id: " + id));
    }

    @DeleteMapping("contacts/delete/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void deleteContact(@PathVariable int id) {
        contactRepository.deleteById(id);
    }
}
