from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

class DraggableImageViewSet(ModelViewSet):
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data={'image': request.data['image']})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        reviews_qty = self.model.objects.all().count()
        self.update_sequence(serializer.data['id'], reviews_qty, 0)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def update(self, request, *args, **kwargs):
        old_object = self.get_object()
        old_position = old_object.position
        serializer = self.get_serializer(old_object, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        if request.data["position"] != old_position:
            self.update_sequence(request.data['id'], old_position, request.data['position'])
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    
    def destroy(self, request, *args, **kwargs):
        object_to_delete = self.get_object()
        objects_qty = self.model.objects.all().count()
        self.update_sequence(object_to_delete.id, object_to_delete.position, objects_qty)
        object_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    def update_sequence(self, object_id, old_position, new_position):
        objects = self.model.objects.exclude(id=object_id)

        if new_position < old_position:   
            for o in objects:
                if o.position >= new_position and o.position < old_position:
                    o.position += 1
                    o.save()
        elif new_position > old_position:
            for o in objects:
                if o.position <= new_position and o.position > old_position:
                    o.position -= 1
                    o.save()
