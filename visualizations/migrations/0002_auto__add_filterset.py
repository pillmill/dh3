# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'FilterSet'
        db.create_table(u'visualizations_filterset', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('repo', self.gf('django.db.models.fields.related.ForeignKey')(related_name='filters', to=orm['repos.Repository'])),
            ('user', self.gf('django.db.models.fields.related.ForeignKey')(related_name='user', to=orm['auth.User'])),
            ('is_public', self.gf('django.db.models.fields.BooleanField')(default=False)),
            ('querystring', self.gf('django.db.models.fields.CharField')(max_length=1024)),
        ))
        db.send_create_signal(u'visualizations', ['FilterSet'])


    def backwards(self, orm):
        # Deleting model 'FilterSet'
        db.delete_table(u'visualizations_filterset')


    models = {
        u'auth.group': {
            'Meta': {'object_name': 'Group'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '80'}),
            'permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'})
        },
        u'auth.permission': {
            'Meta': {'ordering': "(u'content_type__app_label', u'content_type__model', u'codename')", 'unique_together': "((u'content_type', u'codename'),)", 'object_name': 'Permission'},
            'codename': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'content_type': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['contenttypes.ContentType']"}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        u'auth.user': {
            'Meta': {'object_name': 'User'},
            'date_joined': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'email': ('django.db.models.fields.EmailField', [], {'max_length': '75', 'blank': 'True'}),
            'first_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'groups': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Group']", 'symmetrical': 'False', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_active': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'is_staff': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_superuser': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'last_login': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now'}),
            'last_name': ('django.db.models.fields.CharField', [], {'max_length': '30', 'blank': 'True'}),
            'password': ('django.db.models.fields.CharField', [], {'max_length': '128'}),
            'user_permissions': ('django.db.models.fields.related.ManyToManyField', [], {'to': u"orm['auth.Permission']", 'symmetrical': 'False', 'blank': 'True'}),
            'username': ('django.db.models.fields.CharField', [], {'unique': 'True', 'max_length': '30'})
        },
        u'contenttypes.contenttype': {
            'Meta': {'ordering': "('name',)", 'unique_together': "(('app_label', 'model'),)", 'object_name': 'ContentType', 'db_table': "'django_content_type'"},
            'app_label': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'model': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '100'})
        },
        u'organizations.organization': {
            'Meta': {'ordering': "['name']", 'object_name': 'Organization', '_ormbases': [u'auth.Group']},
            'gravatar': ('django.db.models.fields.EmailField', [], {'max_length': '75', 'blank': 'True'}),
            u'group_ptr': ('django.db.models.fields.related.OneToOneField', [], {'to': u"orm['auth.Group']", 'unique': 'True', 'primary_key': 'True'}),
            'owner': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['auth.User']"}),
            'users': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'organization_users'", 'symmetrical': 'False', 'through': u"orm['organizations.OrganizationUser']", 'to': u"orm['auth.User']"})
        },
        u'organizations.organizationuser': {
            'Meta': {'ordering': "['organization', 'user']", 'unique_together': "(('user', 'organization'),)", 'object_name': 'OrganizationUser'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_admin': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'organization': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'organization_user'", 'to': u"orm['organizations.Organization']"}),
            'pending': ('django.db.models.fields.BooleanField', [], {'default': 'True'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'organization_user'", 'to': u"orm['auth.User']"})
        },
        u'repos.repository': {
            'Meta': {'ordering': "['org', 'name']", 'object_name': 'Repository'},
            'date_created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'date_updated': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'description': ('django.db.models.fields.CharField', [], {'max_length': '1024', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_form_public': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_public': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'is_tracker': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'mongo_id': ('django.db.models.fields.CharField', [], {'max_length': '24'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '256'}),
            'org': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'repositories'", 'null': 'True', 'to': u"orm['organizations.Organization']"}),
            'study': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'repositories'", 'null': 'True', 'to': u"orm['studies.Study']"}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'repositories'", 'null': 'True', 'to': u"orm['auth.User']"})
        },
        u'studies.study': {
            'Meta': {'ordering': "['name']", 'object_name': 'Study'},
            'date_created': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'date_updated': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            'description': ('django.db.models.fields.CharField', [], {'max_length': '1024', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '256'}),
            'org': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'studies'", 'null': 'True', 'to': u"orm['organizations.Organization']"}),
            'tracker': ('django.db.models.fields.CharField', [], {'max_length': '256', 'blank': 'True'}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'studies'", 'null': 'True', 'to': u"orm['auth.User']"})
        },
        u'visualizations.filterset': {
            'Meta': {'object_name': 'FilterSet'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'is_public': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'querystring': ('django.db.models.fields.CharField', [], {'max_length': '1024'}),
            'repo': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'filters'", 'to': u"orm['repos.Repository']"}),
            'user': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'user'", 'to': u"orm['auth.User']"})
        },
        u'visualizations.visualization': {
            'Meta': {'ordering': "['name']", 'object_name': 'Visualization'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'repo': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'visualizations'", 'to': u"orm['repos.Repository']"}),
            'x_axis': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'y_axis': ('django.db.models.fields.CharField', [], {'max_length': '255'})
        }
    }

    complete_apps = ['visualizations']