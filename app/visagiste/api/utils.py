from .models import Review


def update_reviews_sequence(review_id, old_position, new_position):
    reviews: list[Review] = Review.objects.exclude(id=review_id)

    if new_position < old_position:        
        for r in reviews:
            if r.position >= new_position and r.position < old_position:
                r.position += 1
                r.save()
    elif new_position > old_position:
        for r in reviews:
            if r.position <= new_position and r.position > old_position:
                r.position -= 1
                r.save()
