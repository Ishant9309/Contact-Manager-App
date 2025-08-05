package com.example.contactmanager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    @GetMapping
    public List<Contact> getAllContacts() {
        return contactRepository.findAll();
    }

    @PostMapping
    public Contact createContact(@RequestBody Contact contact) {
        return contactRepository.save(contact);
    }

    @DeleteMapping("/{id}")
    public void deleteContact(@PathVariable Long id) {
        contactRepository.deleteById(id);
    }
}
