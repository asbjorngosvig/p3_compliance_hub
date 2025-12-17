package com.compliancehub.shared.utils;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/locations")
public class LocationsController {

    @GetMapping("/")
    ResponseEntity<Set<String>> getAllLocations() {
        return ResponseEntity.ok(Locations.locations);
    }

    // Returnere alle lande som indeholder den streng der kommer ind. gør det muligt at søge.
    @GetMapping("/{name}")
    ResponseEntity<List<String>> getLocationsWhereNameIs(@PathVariable String name) {
        List newArr = new ArrayList<>();

        for (String loc : Locations.locations) {
            if (loc.startsWith(name.toUpperCase())) {
                newArr.add(loc);
            }
        }

        return ResponseEntity.ok(newArr);
    }

}

