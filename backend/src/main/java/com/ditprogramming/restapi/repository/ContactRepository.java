package com.ditprogramming.restapi.repository;

import com.ditprogramming.restapi.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, Integer> {

}
