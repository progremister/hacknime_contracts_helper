package kyrylo.delivery.com.deliveryusersmicroservice.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ErrorDetails {
    private int statusCode;
    private String message;
    private String details;
}
