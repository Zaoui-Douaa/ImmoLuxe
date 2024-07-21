package com.example.immoluxe.Controller;

import com.example.immoluxe.Entity.Property;
import com.example.immoluxe.Repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/")
public class PropertyController {

    @Autowired
    private PropertyRepository propertyRepository;

    private String uploadDir = "../../../resources/uploads";

    // get all properties
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/properties")
    public List<Property> getAllProperties() {
        List<Property> properties = propertyRepository.findAll();
        properties.forEach(this::setPhotoUrlForProperty);
        return properties;
    }

    // create property
    @PostMapping("/properties")
    public Property createProperty(@RequestParam("type") String type,
                                   @RequestParam("bedrooms") int bedrooms,
                                   @RequestParam("price") double price,
                                   @RequestParam("bathrooms") int bathrooms,
                                   @RequestParam("area") int area,
                                   @RequestParam("description") String description,
                                   @RequestParam("photo") MultipartFile photo) throws IOException {

        Property property = new Property();
        property.setType(type);
        property.setBedrooms(bedrooms);
        property.setPrice(price);
        property.setBathrooms(bathrooms);
        property.setArea(area);
        property.setDescription(description);

        // Handle file saving
        if (!photo.isEmpty()) {
            String fileName = System.currentTimeMillis() + "_" + StringUtils.cleanPath(photo.getOriginalFilename());
            Path path = Paths.get(uploadDir + "/" + fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, photo.getBytes());
            String photoUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/api/v1/files/")
                    .path(fileName)
                    .toUriString();
            property.setPhotoUrl(photoUrl);
        }

        return propertyRepository.save(property);
    }

    // get property by id
    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/properties/{id}")
    public ResponseEntity<Property> getPropertyByID(@PathVariable Long id) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property with id " + id + " does not exist"));
        setPhotoUrlForProperty(property);
        return ResponseEntity.ok(property);
    }

    // update property
    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/properties/{id}")
    public ResponseEntity<Property> updatePropertyByID(@PathVariable Long id,
                                                       @RequestParam("type") String type,
                                                       @RequestParam("bedrooms") int bedrooms,
                                                       @RequestParam("price") double price,
                                                       @RequestParam("bathrooms") int bathrooms,
                                                       @RequestParam("area") int area,
                                                       @RequestParam("description") String description,
                                                       @RequestParam(value = "photo", required = false) MultipartFile photo) throws IOException {

        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property with id " + id + " does not exist"));

        property.setType(type);
        property.setBedrooms(bedrooms);
        property.setPrice(price);
        property.setBathrooms(bathrooms);
        property.setArea(area);
        property.setDescription(description);

        // Handle file saving if a new photo is uploaded
        if (photo != null && !photo.isEmpty()) {
            String fileName = System.currentTimeMillis() + "_" + StringUtils.cleanPath(photo.getOriginalFilename());
            Path path = Paths.get(uploadDir + "/" + fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, photo.getBytes());
            String photoUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/api/v1/files/")
                    .path(fileName)
                    .toUriString();
            property.setPhotoUrl(photoUrl);
        }

        Property updatedProperty = propertyRepository.save(property);
        setPhotoUrlForProperty(updatedProperty);
        return ResponseEntity.ok(updatedProperty);
    }

    // delete property
    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/properties/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteProperty(@PathVariable Long id) {
        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Property with id " + id + " does not exist"));

        propertyRepository.delete(property);

        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

    // endpoint to serve files
    @GetMapping("/files/{filename:.+}")
    @ResponseBody
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
        try {
            Path file = Paths.get(uploadDir).resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(Files.probeContentType(file)))
                        .body(resource);
            } else {
                throw new RuntimeException("Could not read the file!");
            }
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        } catch (IOException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    // Helper method to set full photo URL for each property
    private void setPhotoUrlForProperty(Property property) {
        if (property.getPhotoUrl() != null) {
            property.setPhotoUrl(ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/api/v1/files/")
                    .path(property.getPhotoUrl().substring(property.getPhotoUrl().lastIndexOf("/") + 1))
                    .toUriString());
        }
    }
}
