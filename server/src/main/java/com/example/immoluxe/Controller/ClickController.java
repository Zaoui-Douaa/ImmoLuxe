package com.example.immoluxe.Controller;

import com.example.immoluxe.Entity.Click;
import com.example.immoluxe.Entity.Property;
import com.example.immoluxe.Repository.ClickRepository;
import com.example.immoluxe.Repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/clicks")
public class ClickController {

    @Autowired
    private ClickRepository clickRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    private static final String UPLOAD_DIR = "uploads/";

    // Create a new click
    @GetMapping("/add/{propertyId}")
    public ResponseEntity<Click> createClick(@PathVariable Long propertyId) {
        Optional<Property> propertyOpt = propertyRepository.findById(propertyId);
        if (!propertyOpt.isPresent()) {
            return ResponseEntity.badRequest().build();
        }

        Click click = new Click(LocalDateTime.now(), propertyOpt.get());
        Click savedClick = clickRepository.save(click);

        return ResponseEntity.ok(savedClick);
    }

    // Get all clicks
    @GetMapping
    public List<Click> getAllClicks() {
        return clickRepository.findAll();
    }


    // Get clicks by property ID
    @GetMapping("/property/{propertyId}")
    public ResponseEntity<List<Click>> getClicksByPropertyId(@PathVariable Long propertyId) {
        Optional<Property> propertyOpt = propertyRepository.findById(propertyId);
        if (propertyOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        List<Click> clicks = clickRepository.findByProperty(propertyOpt.get());
        return ResponseEntity.ok(clicks);
    }

    @GetMapping("/files/{fileName}")
    public ResponseEntity<byte[]> getFile(@PathVariable String fileName) throws IOException {
        Path path = Paths.get(UPLOAD_DIR + fileName);
        byte[] fileContent = Files.readAllBytes(path);
        return ResponseEntity.ok().body(fileContent);
    }
}
